interface TagProps {
  text: string
  count?: number
}

const Tag = ({ text, count }: TagProps) => {
  return (
    <div className="mr-2 mt-1 rounded-lg border border-gray-300 hover:border-gray-700 px-2 py-1 text-xs font-semibold uppercase text-gray-600 transition duration-500 ease-in-out hover:bg-gray-600 hover:text-gray-100 bg-white">
      {text.split(' ').join('-')} {count && `(${count})`}
    </div>
  )
}

export default Tag
