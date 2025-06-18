import React, { useState } from 'react';
import Modal from './Modal';
import { Shield, FileText, Cookie, Calendar, Mail, Phone } from 'lucide-react';

interface LegalModalsProps {
  children: (openModal: (type: 'privacy' | 'terms' | 'cookies') => void) => React.ReactNode;
}

export default function LegalModals({ children }: LegalModalsProps) {
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | 'cookies' | null>(null);

  const openModal = (type: 'privacy' | 'terms' | 'cookies') => {
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const PrivacyPolicyContent = () => (
    <div className="space-y-6 text-gray-300 leading-relaxed">
      <div className="flex items-center space-x-3 mb-6">
        <Shield className="w-6 h-6 text-blue-400" />
        <span className="text-sm text-blue-400 font-medium">Last updated: January 2025</span>
      </div>

      <section>
        <h3 className="text-xl font-semibold text-white mb-4">1. Information We Collect</h3>
        <div className="space-y-3">
          <p>
            <strong className="text-blue-300">Personal Information:</strong> When you contact us or use our services, 
            we may collect personal information such as your name, email address, phone number, company name, 
            and project details.
          </p>
          <p>
            <strong className="text-blue-300">Usage Data:</strong> We automatically collect information about how 
            you interact with our website, including IP address, browser type, pages visited, and time spent on our site.
          </p>
          <p>
            <strong className="text-blue-300">Cookies and Tracking:</strong> We use cookies and similar technologies 
            to enhance your browsing experience and analyze website traffic.
          </p>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-4">2. How We Use Your Information</h3>
        <ul className="space-y-2 list-disc list-inside">
          <li>To provide and improve our services</li>
          <li>To communicate with you about projects and inquiries</li>
          <li>To send you relevant updates and marketing communications (with your consent)</li>
          <li>To analyze website usage and optimize user experience</li>
          <li>To comply with legal obligations</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-4">3. Information Sharing</h3>
        <p>
          We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
        </p>
        <ul className="space-y-2 list-disc list-inside mt-3">
          <li>With your explicit consent</li>
          <li>To comply with legal requirements or court orders</li>
          <li>To protect our rights, property, or safety</li>
          <li>With trusted service providers who assist in our operations (under strict confidentiality agreements)</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-4">4. Data Security</h3>
        <p>
          We implement industry-standard security measures to protect your personal information against unauthorized 
          access, alteration, disclosure, or destruction. This includes encryption, secure servers, and regular 
          security audits.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-4">5. Your Rights</h3>
        <p>You have the right to:</p>
        <ul className="space-y-2 list-disc list-inside mt-3">
          <li>Access and review your personal information</li>
          <li>Request corrections to inaccurate data</li>
          <li>Request deletion of your personal information</li>
          <li>Opt-out of marketing communications</li>
          <li>Data portability (receive your data in a structured format)</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-4">6. Contact Information</h3>
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <p className="mb-3">For any privacy-related questions or requests, please contact us:</p>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>privacy@fusioninteractive.ca</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-green-400" />
              <span>+1 (555) 123-4567</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const TermsOfServiceContent = () => (
    <div className="space-y-6 text-gray-300 leading-relaxed">
      <div className="flex items-center space-x-3 mb-6">
        <FileText className="w-6 h-6 text-purple-400" />
        <span className="text-sm text-purple-400 font-medium">Last updated: January 2025</span>
      </div>

      <section>
        <h3 className="text-xl font-semibold text-white mb-4">1. Acceptance of Terms</h3>
        <p>
          By accessing and using Fusion Interactive's website and services, you accept and agree to be bound by 
          the terms and provision of this agreement. If you do not agree to abide by the above, please do not 
          use this service.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-4">2. Services Description</h3>
        <p>
          Fusion Interactive provides web development, event technology solutions, mobile applications, AI/ML 
          development, and custom software solutions. Our services include but are not limited to:
        </p>
        <ul className="space-y-2 list-disc list-inside mt-3">
          <li>Custom website and web application development</li>
          <li>Event engagement technology and interactive experiences</li>
          <li>Mobile application development for iOS and Android</li>
          <li>AI and machine learning solution implementation</li>
          <li>Virtual and augmented reality experiences</li>
          <li>Consulting and technical advisory services</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-4">3. Project Terms and Payment</h3>
        <div className="space-y-3">
          <p>
            <strong className="text-purple-300">Project Scope:</strong> All projects begin with a detailed scope 
            of work that outlines deliverables, timelines, and costs. Changes to the scope may result in 
            additional charges.
          </p>
          <p>
            <strong className="text-purple-300">Payment Terms:</strong> Payment schedules are established on a 
            per-project basis. Typically, we require a deposit before work begins, with remaining payments tied 
            to project milestones.
          </p>
          <p>
            <strong className="text-purple-300">Intellectual Property:</strong> Upon full payment, clients receive 
            ownership of custom-developed code and assets. We retain rights to our proprietary tools, frameworks, 
            and methodologies.
          </p>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-4">4. Client Responsibilities</h3>
        <ul className="space-y-2 list-disc list-inside">
          <li>Provide accurate and complete project requirements</li>
          <li>Supply necessary content, assets, and access credentials in a timely manner</li>
          <li>Respond to requests for feedback and approvals within agreed timeframes</li>
          <li>Make payments according to the agreed schedule</li>
          <li>Ensure all provided content complies with applicable laws and regulations</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-4">5. Limitation of Liability</h3>
        <p>
          Fusion Interactive's liability for any claim arising from our services shall not exceed the total 
          amount paid by the client for the specific project. We are not liable for indirect, incidental, 
          or consequential damages.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-4">6. Warranty and Support</h3>
        <div className="space-y-3">
          <p>
            We provide a 90-day warranty on all custom development work, covering bugs and issues that prevent 
            the delivered solution from functioning as specified.
          </p>
          <p>
            Ongoing support and maintenance services are available under separate agreements. We recommend 
            regular updates and maintenance to ensure optimal performance and security.
          </p>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-4">7. Termination</h3>
        <p>
          Either party may terminate a project agreement with written notice. In case of termination, the client 
          is responsible for payment of all work completed up to the termination date.
        </p>
      </section>
    </div>
  );

  const CookiesPolicyContent = () => (
    <div className="space-y-6 text-gray-300 leading-relaxed">
      <div className="flex items-center space-x-3 mb-6">
        <Cookie className="w-6 h-6 text-yellow-400" />
        <span className="text-sm text-yellow-400 font-medium">Last updated: January 2025</span>
      </div>

      <section>
        <h3 className="text-xl font-semibold text-white mb-4">What Are Cookies?</h3>
        <p>
          Cookies are small text files that are stored on your device when you visit our website. They help us 
          provide you with a better browsing experience by remembering your preferences and analyzing how you 
          use our site.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-4">Types of Cookies We Use</h3>
        
        <div className="space-y-4">
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <h4 className="font-semibold text-yellow-300 mb-2">Essential Cookies</h4>
            <p className="text-sm">
              These cookies are necessary for the website to function properly. They enable basic features like 
              page navigation and access to secure areas of the website.
            </p>
          </div>

          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <h4 className="font-semibold text-blue-300 mb-2">Analytics Cookies</h4>
            <p className="text-sm">
              We use analytics cookies to understand how visitors interact with our website. This helps us 
              improve our content and user experience. We may use Google Analytics for this purpose.
            </p>
          </div>

          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <h4 className="font-semibold text-purple-300 mb-2">Functional Cookies</h4>
            <p className="text-sm">
              These cookies enable enhanced functionality and personalization, such as remembering your 
              preferences and providing customized content.
            </p>
          </div>

          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <h4 className="font-semibold text-green-300 mb-2">Marketing Cookies</h4>
            <p className="text-sm">
              With your consent, we may use marketing cookies to deliver relevant advertisements and track 
              the effectiveness of our marketing campaigns.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-4">Third-Party Cookies</h3>
        <p>
          We may use third-party services that set their own cookies. These include:
        </p>
        <ul className="space-y-2 list-disc list-inside mt-3">
          <li><strong>Google Analytics:</strong> For website traffic analysis</li>
          <li><strong>Social Media Platforms:</strong> For social sharing functionality</li>
          <li><strong>Content Delivery Networks:</strong> For improved website performance</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-4">Managing Your Cookie Preferences</h3>
        <div className="space-y-3">
          <p>
            You can control and manage cookies in several ways:
          </p>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Browser Settings:</strong> Most browsers allow you to block or delete cookies</li>
            <li><strong>Opt-out Tools:</strong> Use industry opt-out tools for advertising cookies</li>
            <li><strong>Privacy Settings:</strong> Adjust your privacy settings on social media platforms</li>
          </ul>
          <div className="bg-yellow-900/20 border border-yellow-400/30 rounded-lg p-4 mt-4">
            <p className="text-yellow-200 text-sm">
              <strong>Note:</strong> Disabling certain cookies may affect the functionality of our website 
              and your user experience.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-4">Cookie Consent</h3>
        <p>
          By continuing to use our website, you consent to our use of cookies as described in this policy. 
          You can withdraw your consent at any time by adjusting your browser settings or contacting us directly.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-white mb-4">Updates to This Policy</h3>
        <p>
          We may update this Cookie Policy from time to time to reflect changes in our practices or for other 
          operational, legal, or regulatory reasons. We will notify you of any material changes by posting the 
          updated policy on our website.
        </p>
      </section>
    </div>
  );

  return (
    <>
      {children(openModal)}
      
      <Modal
        isOpen={activeModal === 'privacy'}
        onClose={closeModal}
        title="Privacy Policy"
      >
        <PrivacyPolicyContent />
      </Modal>

      <Modal
        isOpen={activeModal === 'terms'}
        onClose={closeModal}
        title="Terms of Service"
      >
        <TermsOfServiceContent />
      </Modal>

      <Modal
        isOpen={activeModal === 'cookies'}
        onClose={closeModal}
        title="Cookie Policy"
      >
        <CookiesPolicyContent />
      </Modal>
    </>
  );
}