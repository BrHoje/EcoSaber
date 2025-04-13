import { useTranslation } from "react-i18next";

export default function SDGSection() {
  const { t } = useTranslation();
  // Using translation for targets
  const sdgTargets = [
    {
      number: t('sdg.target') + " 4.1",
      description: t('sdg.targets.0')
    },
    {
      number: t('sdg.target') + " 4.7",
      description: t('sdg.targets.1')
    },
    {
      number: t('sdg.target') + " 4.c",
      description: t('sdg.targets.2')
    }
  ];

  return (
    <section id="ods" className="py-16 px-4 sm:px-6 lg:px-8 bg-neutral-light">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <img 
              src="https://static.wixstatic.com/media/977b37_7e9c4c19bbea4a5dbe1ed07f57f89a45~mv2.png/v1/fill/w_1000,h_477,al_c,q_90,usm_0.66_1.00_0.01/977b37_7e9c4c19bbea4a5dbe1ed07f57f89a45~mv2.png" 
              alt="ODS 4 - Educação de Qualidade" 
              className="max-w-full w-auto h-auto"
              style={{ maxHeight: "250px" }}
            />
          </div>
          <h2 className="text-3xl font-bold font-heading text-neutral-dark mb-4">{t('sdg.title')}</h2>
          <p className="text-lg text-neutral-dark max-w-3xl mx-auto">
            {t('sdg.description')}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
          <div className="md:flex">
            <div className="md:flex-shrink-0 md:w-1/3">
              <img 
                className="h-full w-full object-cover md:h-full md:w-full" 
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80" 
                alt="Estudantes em sala de aula"
              />
            </div>
            <div className="p-8 md:w-2/3">
              <h3 className="text-2xl font-bold font-heading text-un-blue mb-4">
                {t('sdg.whyImportant')}
              </h3>
              <p className="text-gray-700 mb-4">
                {t('sdg.importanceText1')}
              </p>
              <p className="text-gray-700">
                {t('sdg.importanceText2')}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sdgTargets.map((target, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h4 className="text-xl font-bold font-heading text-un-blue mb-3">
                {target.number}
              </h4>
              <p className="text-gray-700">{target.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
