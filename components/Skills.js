export default function Skills({ skills }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Skills & Tools</h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span key={skill} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">{skill}</span>
        ))}
      </div>
    </section>
  );
}
