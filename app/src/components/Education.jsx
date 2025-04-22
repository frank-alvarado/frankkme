// Using explicit image filenames defined in cv.yml

export default function Education({ education }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Education</h2>
      {education.map((e, i) => (
        <div key={i} className="mb-4">
          <h4 className="font-semibold">{e.degree}</h4>
          <div className="flex items-center gap-2 text-gray-600">
            {e.image && (
              <img
                src={`/education/${e.image}`}
                alt={`${e.school} logo`}
                className="h-6 w-6"
              />
            )}
            <div>
              <span className="font-medium">{e.school}</span>
              <p className="text-sm text-gray-500">{e.location}</p>
              <p className="text-sm text-gray-500">
                {e.time}
              </p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
