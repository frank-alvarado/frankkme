export default function Skills({ skills }) {
  // Render categories: Proficient, Familiar, Technologies and Tools
  const categories = [
    { key: 'proficient', label: 'Proficient' },
    { key: 'familiar', label: 'Familiar' },
    { key: 'tools', label: 'Technologies and Tools' },
  ];
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Skills</h2>
      {categories.map(({ key, label }) => (
        skills[key]?.length > 0 && (
          <div key={key} className="mb-6">
            <h3 className="text-xl font-semibold mb-2">{label}</h3>
            <div className="flex flex-wrap gap-2">
              {skills[key].map(item => (
                <span key={item} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )
      ))}
    </section>
  );
}
