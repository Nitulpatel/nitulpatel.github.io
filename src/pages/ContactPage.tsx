import React from 'react';
import Contact from '../components/Contact';

interface ContactPageProps {
  onSubmissionSuccess: () => void;
}

const ContactPage = ({ onSubmissionSuccess }: ContactPageProps) => {
  return (
    <main>
      <Contact onSubmissionSuccess={onSubmissionSuccess} standalone />
    </main>
  );
};

export default ContactPage;
