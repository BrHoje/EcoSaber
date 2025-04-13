import { useQuery } from "@tanstack/react-query";
import { Stat } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";

export default function AboutSection() {
  const { t } = useTranslation();
  const { data: stats, isLoading } = useQuery<Stat[]>({
    queryKey: ["/api/stats?category=about"],
  });

  return (
    <section id="sobre" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold font-heading text-neutral-dark mb-4">{t('about.title')}</h2>
          <p className="text-lg text-neutral-dark max-w-3xl mx-auto">
            {t('about.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold font-heading text-un-blue mb-4">{t('about.problem.title')}</h3>
            <p className="mb-4">
              {t('about.problem.description')}
            </p>
            
            <h3 className="text-2xl font-bold font-heading text-un-blue mb-4 mt-8">{t('about.solution.title')}</h3>
            <p className="mb-4">
              {t('about.solution.description')}
            </p>
            
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>{t('about.solution.items.0')}</li>
              <li>{t('about.solution.items.1')}</li>
              <li>{t('about.solution.items.2')}</li>
              <li>{t('about.solution.items.3')}</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {isLoading ? (
              // Skeleton loaders for stats while loading
              Array(4).fill(0).map((_, index) => (
                <div key={index} className="bg-neutral-light rounded-lg p-6 text-center shadow-md">
                  <Skeleton className="h-9 w-16 mx-auto mb-2" />
                  <Skeleton className="h-4 w-32 mx-auto" />
                </div>
              ))
            ) : (
              stats?.map((stat) => (
                <div key={stat.id} className="bg-neutral-light rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-3xl font-bold text-un-blue mb-2">{stat.value}</div>
                  <div className="text-sm font-medium text-neutral-dark">{stat.label}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
