import Image from 'next/image';
import Section from '@/components/Section';

import { certificates } from "@/data/certifications";

const Certifications = () => (
    <Section id='certifications' title='Certifications'>
        {certificates.map((certificate) => (
            <div className='transition-all duration-700' key={certificate.title} >
                <a href={certificate.link} target="_blank">
                    <div className='section-item p-3 md:p-1'>
                        <Image src={certificate.badge} alt={`Badge for ${certificate.title}`} width={150} height={150} />
                        <p className='text-nowrap text-xl text-secondary-600'>{certificate.title}</p>
                        <p className='dark:text-darkPrimary text-primary'>{certificate.organization.name}</p>
                        <p className='dark:text-zinc-400 text-zinc-600'>{certificate.date}</p>
                    </div>
                </a>
            </div>
        ))}
    </Section>
);

export default Certifications;
