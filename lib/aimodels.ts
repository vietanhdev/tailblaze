/**
 * Utility functions for loading and running AI models in the browser
 */

// Extend Navigator interface to include WebGPU
interface NavigatorGPU extends Navigator {
  gpu?: {
    requestAdapter: () => Promise<GPUAdapter | null>
  }
}

/**
 * Check if the browser supports WebGPU
 * @returns Whether WebGPU is available
 */
export function isWebGPUSupported(): boolean {
  return typeof window !== 'undefined' && !!(window.navigator as NavigatorGPU)?.gpu
}

/**
 * Get browser WebGPU compatibility message
 * @returns Compatibility message
 */
export function getWebGPUCompatibilityMessage(): string {
  if (typeof window === 'undefined') {
    return 'WebGPU compatibility can only be checked in the browser.'
  }

  if (!(window.navigator as NavigatorGPU)?.gpu) {
    return 'Your browser does not support WebGPU. Please use Chrome or Edge version 113+.'
  }

  return 'Your browser supports WebGPU.'
}

interface GPUCapabilitiesResult {
  supported: boolean
  reason?: string
  vendor?: string
  architecture?: string
  device?: string
  description?: string
  features?: string[]
  limits?: Record<string, unknown>
  error?: string
}

// Define necessary WebGPU types
interface GPUAdapter {
  requestAdapterInfo: () => GPUAdapterInfo
  requestDevice: () => Promise<GPUDevice>
  features: Set<string>
}

interface GPUAdapterInfo {
  vendor: string
  architecture: string
  device: string
  description: string
}

interface GPUDevice {
  limits: Record<string, unknown>
}

/**
 * Detect device GPU capabilities
 * @returns GPU capabilities
 */
export async function detectGPUCapabilities(): Promise<GPUCapabilitiesResult> {
  if (!isWebGPUSupported()) {
    return { supported: false }
  }

  try {
    const adapter = await (window.navigator as NavigatorGPU).gpu!.requestAdapter()
    if (!adapter) {
      return {
        supported: false,
        reason: 'No GPU adapter found',
      }
    }

    const info = await adapter.requestAdapterInfo()
    const device = await adapter.requestDevice()

    return {
      supported: true,
      vendor: info.vendor,
      architecture: info.architecture,
      device: info.device,
      description: info.description,
      features: Array.from(adapter.features),
      limits: Object.fromEntries(
        Object.entries(device.limits).filter(([key]) => key !== 'prototype')
      ),
    }
  } catch (error) {
    return {
      supported: false,
      error: (error as Error).message,
    }
  }
}

interface AIModelBase {
  name: string
  type: string
  description: string
  runtime: string
  modelSize: string
  status?: 'coming-soon'
  minRequirements?: {
    gpu?: boolean
  }
}

interface LLMModel extends AIModelBase {
  type: 'llm'
  modelId: string
  parameters: string
  workerPath: string
}

interface VisionModel extends AIModelBase {
  type: 'vision'
}

interface AudioModel extends AIModelBase {
  type: 'audio'
}

type AIModel = LLMModel | VisionModel | AudioModel

/**
 * AI Models registry - metadata for supported models
 */
export const AI_MODELS: Record<string, AIModel> = {
  'deepseek-r1': {
    name: 'DeepSeek R1',
    type: 'llm',
    description: 'A lightweight LLM for chat and general text generation',
    modelId: 'onnx-community/DeepSeek-R1-Distill-Qwen-1.5B-ONNX',
    runtime: 'webgpu',
    parameters: '1.5B',
    modelSize: '650MB',
    workerPath: '/ai_webapps/deepseek-r1-webgpu/dist/worker.js',
    minRequirements: {
      gpu: true,
    },
  },
  'segment-anything': {
    name: 'Segment Anything',
    type: 'vision',
    description: 'Interactive image segmentation model',
    runtime: 'webgl',
    modelSize: '120MB',
    status: 'coming-soon',
  },
  'text-to-speech': {
    name: 'Text to Speech',
    type: 'audio',
    description: 'Convert text to natural speech',
    runtime: 'webgl',
    modelSize: '150MB',
    status: 'coming-soon',
  },
  'speech-to-text': {
    name: 'Speech to Text',
    type: 'audio',
    description: 'Transcribe speech to text',
    runtime: 'webgl',
    modelSize: '85MB',
    status: 'coming-soon',
  },
}

// Type guard to check if a model is an LLM model
function isLLMModel(model: AIModel): model is LLMModel {
  return model.type === 'llm'
}

/**
 * Initialize a model worker
 * @param modelId - The model ID from AI_MODELS
 * @param progressCallback - Callback for loading progress
 * @param messageCallback - Callback for worker messages
 * @param errorCallback - Callback for errors
 * @returns The initialized worker or null if not supported
 */
export function initializeModelWorker(
  modelId: string,
  progressCallback?: (progress: number) => void,
  messageCallback?: (event: MessageEvent) => void,
  errorCallback?: (error: ErrorEvent | Error) => void
): Worker | null {
  if (typeof window === 'undefined') {
    return null
  }

  const model = AI_MODELS[modelId]
  if (!model || model.status === 'coming-soon') {
    return null
  }

  if (model.minRequirements?.gpu && !isWebGPUSupported()) {
    return null
  }

  // Only proceed if it's an LLM model with a workerPath
  if (!isLLMModel(model)) {
    return null
  }

  try {
    const worker = new Worker(new URL(model.workerPath, window.location.origin), { type: 'module' })

    if (messageCallback) {
      worker.addEventListener('message', messageCallback)
    }

    if (errorCallback) {
      worker.addEventListener('error', errorCallback as (event: ErrorEvent) => void)
    }

    return worker
  } catch (error) {
    if (errorCallback) {
      errorCallback(error as Error)
    }
    return null
  }
}
