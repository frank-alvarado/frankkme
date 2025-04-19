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
        <title>Frank Alvarado CV</title>
        <meta name="description" content="Frank Alvarado's CV" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
  const filePath = path.join(process.cwd(), 'data', 'cv.yml')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const cv = yaml.load(fileContents)
  return { props: cv }
}
