import Link from '@/components/Link'
import { PageSeo } from '@/components/SEO'
import Tag from '@/components/Tag'
import Project from '@/components/Project'
import siteMetadata from '@/data/siteMetadata'
import projectsData from '@/data/workExperience'
import { getAllFilesFrontMatter } from '@/lib/mdx'

const MAX_DISPLAY = 5
const postDateTemplate = { year: 'numeric', month: 'long', day: 'numeric' }

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }) {
  return (
    <>
      <PageSeo
        title={`Home - ${siteMetadata.author}`}
        description={siteMetadata.description}
        url={siteMetadata.siteUrl}
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5 text-center">
          <div className="flex flex-col items-center justify-center p-6 mx-4 space-y-4 border-2 shadow-xl dark:bg-gray-800 bg-indigo-100 rounded-lg">
              <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                Hey, I'm Surendhar
              </h1>
              <p className="text-xl">Full stack developer with experience in Java, Spring boot, Angular, NextJS, AWS, PCF</p>
          </div>
        </div>
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
            <p className="text-3xl font-extrabold">Career</p>
            <div className="p-4 border-2 rounded-lg hover:shadow-xl">
              <h1 className="text-2xl font-bold">JP Morgan Chase & Co</h1>
              <p className="text-gray-500">Full Stack Developer | July 2013 - April 2021</p><br/>
              <p className="">I have hands on experience in design and development of enterprise web applications with Spring boot,
                Angular, Pivotal Cloud Foundry.</p>

            </div>
        </div>
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
            <p className="text-3xl font-extrabold">Projects</p>
            {projectsData.map((d) => (
              <Project
                key={d.title}
                title={d.title}
                type={d.type}
                technologies={d.technologies}
                description={d.description}
              />
            ))}
            <div className="">
              <Link
                href="/projects"
                className="text-indigo-600 hover:text-ingigo-500 dark:hover:text-blue-400"
                aria-label="all posts"
              >
                All Projects &rarr;
              </Link>
            </div>
        </div>


        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Latest
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>
                          {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                        </time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose text-gray-500 max-w-none dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                          aria-label={`Read "${title}"`}
                        >
                          Read more &rarr;
                         </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
    </>
  )
}
