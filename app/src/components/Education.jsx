export default function Education({ education }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Education</h2>
      {education.map((e, i) => (
        <div key={i} className="mb-4">
          <h4 className="font-semibold">{e.degree}</h4>
          <p className="text-gray-600">{e.school} | {e.time}</p>
        </div>
      ))}
    </section>
  );
}
