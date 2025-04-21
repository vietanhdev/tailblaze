import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Copy, CheckCheck, SendHorizonal, RotateCcw, Square, Bot, Download } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface Message {
  role: 'user' | 'assistant'
  content: string
  isPartial?: boolean
}

interface MetricsData {
  tokens?: number
  responseTime?: number
  [key: string]: any
}

interface ChatInterfaceProps {
  messages?: Message[]
  onSendMessage?: (message: string) => void
  onStopGeneration?: () => void
  onReset?: () => void
  isRunning?: boolean
  examplePrompts?: string[]
  disabled?: boolean
  showMetrics?: boolean
  metrics?: MetricsData | null
  placeholder?: string
  emptyStateTitle?: string
  emptyStateDescription?: string
  allowAttachments?: boolean
  onAttach?: (() => void) | null
}

/**
 * A reusable chat interface component for AI models
 */
export default function ChatInterface({
  messages = [],
  onSendMessage,
  onStopGeneration,
  onReset,
  isRunning = false,
  examplePrompts = [],
  disabled = false,
  showMetrics = false,
  metrics = null,
  placeholder = 'Type a message...',
  emptyStateTitle = 'AI Assistant',
  emptyStateDescription = 'Ask me anything or try one of these examples:',
  allowAttachments = false,
  onAttach = null,
}: ChatInterfaceProps): React.ReactElement {
  const [input, setInput] = useState<string>('')
  const [copied, setCopied] = useState<number | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const lastMessageRef = useRef<HTMLDivElement>(null)
  const [savingConversation, setSavingConversation] = useState<boolean>(false)

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
    }
  }, [input])

  // Auto-scroll chat to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      const shouldScroll =
        chatContainerRef.current.scrollTop + chatContainerRef.current.clientHeight >=
        chatContainerRef.current.scrollHeight - 200

      if (shouldScroll) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
      }
    }
  }, [messages])

  // Focus the textarea when the component is mounted or messages change
  useEffect(() => {
    if (!disabled && textareaRef.current && messages.length > 0 && !isRunning) {
      textareaRef.current.focus()
    }
  }, [messages.length, isRunning, disabled])

  // Reset copied state after 2 seconds
  useEffect(() => {
    if (copied !== null) {
      const timeout = setTimeout(() => setCopied(null), 2000)
      return () => clearTimeout(timeout)
    }
  }, [copied])

  // Handle send message with validation
  const handleSendMessage = (): void => {
    if (!input.trim() || disabled || isRunning) return

    const message = input.trim()
    setInput('')

    if (onSendMessage) {
      onSendMessage(message)
    }

    // Restore textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  // Handle example click
  const handleExampleClick = (example: string): void => {
    setInput(example)
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus()
      }
    }, 0)
  }

  // Handle enter key in textarea
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Handle copy to clipboard
  const handleCopyToClipboard = (text: string, index: number): void => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(index)
    })
  }

  // Save conversation as JSON file
  const handleSaveConversation = (): void => {
    if (messages.length === 0) return

    setSavingConversation(true)

    try {
      const conversationData = {
        messages,
        timestamp: new Date().toISOString(),
        title: messages[0]?.content.substring(0, 40) + '...',
      }

      const blob = new Blob([JSON.stringify(conversationData, null, 2)], {
        type: 'application/json',
      })
      const url = URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = url
      a.download = `conversation-${new Date().toISOString().slice(0, 10)}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to save conversation:', error)
    } finally {
      setSavingConversation(false)
    }
  }

  return (
    <div className="flex flex-col h-full border rounded-lg overflow-hidden bg-card">
      {/* Chat messages */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <div className="w-16 h-16 mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Bot className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-medium text-xl mb-2">{emptyStateTitle}</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">{emptyStateDescription}</p>
            {examplePrompts.length > 0 && (
              <div className="w-full max-w-md space-y-2">
                {examplePrompts.map((example, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start overflow-hidden text-ellipsis whitespace-nowrap"
                    onClick={() => handleExampleClick(example)}
                  >
                    {example}
                  </Button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => {
              const isLastMessage = index === messages.length - 1
              const ref = isLastMessage ? lastMessageRef : null

              return (
                <div
                  key={index}
                  ref={ref}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  } group`}
                >
                  <div
                    className={`relative max-w-[85%] rounded-lg px-4 py-2 ${
                      message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    }`}
                  >
                    {message.role === 'assistant' && message.content && (
                      <button
                        onClick={() => handleCopyToClipboard(message.content, index)}
                        className="absolute -right-7 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label={copied === index ? 'Copied to clipboard' : 'Copy message'}
                        title={copied === index ? 'Copied!' : 'Copy to clipboard'}
                      >
                        {copied === index ? (
                          <CheckCheck className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
                        )}
                      </button>
                    )}

                    <div
                      className={`prose dark:prose-invert ${message.role === 'user' ? 'prose-light' : 'prose-light'} prose-sm max-w-none`}
                    >
                      {message.role === 'assistant' ? (
                        // Render assistant messages with markdown support
                        <ReactMarkdown
                          components={{
                            code({ node, inline, className, children, ...props }) {
                              const match = /language-(\w+)/.exec(className || '')
                              return !inline && match ? (
                                <SyntaxHighlighter
                                  style={oneDark as any}
                                  language={match[1]}
                                  PreTag="div"
                                  {...props}
                                >
                                  {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                              ) : (
                                <code className={className} {...props}>
                                  {children}
                                </code>
                              )
                            },
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      ) : (
                        // Render user messages as plain text with line breaks
                        message.content.split('\n').map((line, i) => (
                          <span key={i}>
                            {line}
                            {i < message.content.split('\n').length - 1 && <br />}
                          </span>
                        ))
                      )}

                      {message.isPartial && (
                        <span className="inline-block w-2 h-4 ml-1 bg-current opacity-75 animate-pulse"></span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Metrics display */}
      {showMetrics && metrics && (
        <div className="border-t border-border px-4 py-2 text-xs text-muted-foreground">
          {metrics.tokens && <span className="mr-4">Tokens: {metrics.tokens}</span>}
          {metrics.responseTime && <span>Response time: {metrics.responseTime}ms</span>}
        </div>
      )}

      {/* Input area */}
      <div className="border-t border-border p-4">
        <div className="flex space-x-2">
          {allowAttachments && onAttach && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="shrink-0"
              onClick={onAttach}
              disabled={disabled || isRunning}
              title="Attach file"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
              </svg>
              <span className="sr-only">Attach file</span>
            </Button>
          )}

          <div className="relative flex-1">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={placeholder}
              rows={1}
              disabled={disabled}
              className="block w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-10"
              style={{ minHeight: '42px' }}
            />
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="absolute right-1 top-1 h-7 w-7"
              onClick={handleSendMessage}
              disabled={!input.trim() || disabled || isRunning}
            >
              <SendHorizonal className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>

          {messages.length > 0 && (
            <>
              {isRunning ? (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="shrink-0"
                  onClick={onStopGeneration}
                  title="Stop generation"
                >
                  <Square className="h-5 w-5" />
                  <span className="sr-only">Stop generation</span>
                </Button>
              ) : (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="shrink-0"
                    onClick={handleSaveConversation}
                    disabled={savingConversation}
                    title="Save conversation"
                  >
                    <Download className="h-5 w-5" />
                    <span className="sr-only">Save conversation</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="shrink-0"
                    onClick={onReset}
                    title="Reset conversation"
                  >
                    <RotateCcw className="h-5 w-5" />
                    <span className="sr-only">Reset conversation</span>
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
