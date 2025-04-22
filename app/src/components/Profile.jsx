export default function Profile({ profile }) {
  return (
    <section className="text-center mb-12">
      <h1 className="text-4xl font-bold mt-4">{profile.name.first} {profile.name.last}</h1>
      <p className="text-xl text-gray-600 mt-2">{profile.title}</p>
      <p className="text-md text-gray-500 mt-1">{profile.location}</p>
      <div className="flex justify-center space-x-4 mt-4">
        <a href={`mailto:${profile.contact.email}`} className="text-blue-500 hover:underline">Email</a>
        <a href={profile.contact.website} target="_blank" rel="noopener" className="text-blue-500 hover:underline">Website</a>
        <a href={profile.contact.github} target="_blank" rel="noopener" className="text-blue-500 hover:underline">GitHub</a>
        <a href={profile.contact.linkedin} target="_blank" rel="noopener" className="text-blue-500 hover:underline">LinkedIn</a>
        <a href="/cv.pdf" download className="text-blue-500 hover:underline">PDF</a>
      </div>
    </section>
  )
}
