import Tag from '@/components/Tag'
import Image from 'next/image'
import Link from '@/components/Link'

const Project = ({ title, type, technologies, description }) => (
  <div className="p-4 border-2 rounded-lg hover:shadow-xl">
    <h1 className="text-2xl font-bold">{title} <span className="text-sm font-normal text-gray-500">{type}</span></h1>
    <div className="flex flex-wrap">
      {technologies.map((tag) => (
        <p key="tag" className="mr-3 text-sm font-medium text-indigo-500 hover:text-blue-600 dark:hover:text-blue-400">{tag}</p>
      ))}
    </div><br/>
    <p className="">{description}</p>

  </div>
)

export default Project
