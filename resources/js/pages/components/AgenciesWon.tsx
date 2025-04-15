import React from 'react';
import { TextAnimate } from "./../../../js/components/ui/magicui/text-animate";
import { useTranslation } from 'react-i18next';
import { cn } from "@/lib/utils";
import { ReactNode } from 'react';

interface Agency {
  id: number;
  name: string;
  agency_type?: string;
  description: string;
  logo_path?: string;
}

interface AgenciesWonProps {
  className?: string;
}

const AgenciesWon: React.FC<AgenciesWonProps> = ({ className }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const agencies: Agency[] = [
    {
      id: 1,
      name: t('agenciesWon.hefenyPharmaName'),
      agency_type: t('agenciesWon.exclusiveAgencyType'),
      description: t('agenciesWon.hefenyPharmaDescription'),
      logo_path: '/icons/hpg_logo.png',
    },
    {
      id: 2,
      name: t('agenciesWon.evaPharmaName'),
      agency_type: t('agenciesWon.agencyType'),
      description: t('agenciesWon.evaPharmaDescription'),
      logo_path: '/icons/eva_pharma_logo.png',
    },
    // Add more agencies here...
  ];

  return (
    <div className={cn("bg-gray-100 py-8 mt-4", className)} dir={isRtl ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-semibold mb-6 dark:text-primary  text-primary text-center"><TextAnimate animation="scaleUp" by="text">{t('agenciesWon.agenciesWon')}</TextAnimate></h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agencies.map((agency) => (
            <div key={agency.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                {agency.logo_path && (
                  <img
                    src={agency.logo_path}
                    alt={`${agency.name} Logo`}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                )}
                <div>
                  <h2 className="text-xl font-semibold text-primary"><TextAnimate animation="scaleUp" by="text">{agency.name}</TextAnimate></h2>
                  {agency.agency_type && <p className="text-gray-600">{agency.agency_type}</p>}
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{agency.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgenciesWon;
