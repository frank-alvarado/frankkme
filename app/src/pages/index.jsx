import Head from 'next/head'
import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import Profile from '../components/Profile'
import Experience from '../components/Experience'
import Education from '../components/Education'
import Skills from '../components/Skills'

export default function Home({ profile, experiences, education, skills }) {
  return (
    <>
      <Head>
        <title>Frank Alvarado | Software Engineer</title>
        <meta name="description" content="Frank Alvarado's CV" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32'><circle cx='16' cy='16' r='16' fill='%23007ACC'/><text x='16' y='21' font-size='16' text-anchor='middle' fill='white' font-family='Arial'>FA</text></svg>" />
      </Head>

      <main className="max-w-3xl mx-auto p-6">
        <Profile profile={profile} />
        <Experience experiences={experiences} />
        <Education education={education} />
        <Skills skills={skills} />
      </main>
    </>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'cv.yml')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const cv = yaml.load(fileContents)
  return { props: cv }
}
