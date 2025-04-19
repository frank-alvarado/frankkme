export default function Experience({ experiences }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Experience</h2>
      {experiences.map((exp, idx) => (
        <div key={idx} className="mb-6">
          <h3 className="text-xl font-semibold">{exp.title}</h3>
          <p className="text-gray-600">{exp.company} | {exp.period}</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            {exp.details.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
