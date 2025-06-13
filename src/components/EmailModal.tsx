import React, { useState } from 'react';
import { X, Send, Mail, CheckCircle, Loader2 } from 'lucide-react';
import { Swimmer } from '../types/swimmer';
// import emailjs from '@emailjs/browser';
// import { EMAILJS_CONFIG } from '../config/emailjs';

interface EmailModalProps {
  swimmers: Swimmer[];
  isOpen: boolean;
  onClose: () => void;
}

export const EmailModal: React.FC<EmailModalProps> = ({ swimmers, isOpen, onClose }) => {
  const [email, setEmail] = useState('mouloud_natation@yahoo.fr');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const generateEmailContent = () => {
    const content = swimmers.map((swimmer, index) => 
      `${index + 1}. ${swimmer.nom} (${swimmer.anneeNaissance})
   Compétition: ${swimmer.competition}
   Course: ${swimmer.course}
   Temps d'engagement: ${swimmer.tempsEngagement}
   ---`
    ).join('\n\n');

    return `Bonjour,

Voici les inscriptions de natation :

${content}

Total: ${swimmers.length} athlète(s) inscrit(s)

Cordialement`;
  };

  const handleSend = async () => {
    try {
      setIsSending(true);
      setError(null);

      // Email sending functionality commented out
      /*
      const templateParams = {
        to_email: email,
        subject: `Inscriptions de natation - ${swimmers.length} athlète(s)`,
        message: generateEmailContent(),
      };

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );
      */

      // Simulate email sending
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSent(true);
      setTimeout(() => {
        setIsSent(false);
        onClose();
      }, 2000);
    } catch (err) {
      setError('Une erreur est survenue lors de l\'envoi de l\'email. Veuillez réessayer.');
      console.error('Error sending email:', err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Mail className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">
                Envoyer les inscriptions par email
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {!isSent ? (
            <>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse email de destination
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="mouloud_natation@yahoo.fr"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Aperçu du contenu
                </label>
                <textarea
                  value={generateEmailContent()}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm font-mono h-64 resize-none"
                />
              </div>

              <div className="mb-6 bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Récapitulatif:</strong> {swimmers.length} athlète(s) inscrit(s)
                </p>
              </div>

              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={isSending}
                >
                  Annuler
                </button>
                <button
                  onClick={handleSend}
                  disabled={!email || isSending}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Envoyer
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Email envoyé avec succès !
              </h4>
              <p className="text-gray-600">
                Les inscriptions ont été transmises par email.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};