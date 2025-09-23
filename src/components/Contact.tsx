import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyUl3hZsbGDdlA6shJgZBkVVJt8Dozaf64bJ15oBPLgZBlEa1S1d65_awjobsWcSKvT/exec'; // wklej URL Web App

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);

    try {
      // Wysyłamy jako application/x-www-form-urlencoded – prosto i bez preflight
      const body = new URLSearchParams({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message
      });

      const res = await fetch(WEB_APP_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body
      });

      // Google Apps Script Web App zwykle zwraca 200, parsujemy JSON
      const data = await res.json().catch(() => ({} as any));
      if (!res.ok || data?.success !== true) {
        throw new Error('Nie udało się zapisać danych. Spróbuj ponownie.');
      }

      setIsSubmitted(true);

      // Reset po 3s (jak wcześniej)
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', phone: '', message: '' });
      }, 3000);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Coś poszło nie tak. Spróbuj ponownie.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isSubmitted) {
    return (
        <section id="kontakt" className="py-20 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-green-100 rounded-2xl p-12">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Dziękujemy za wiadomość!
              </h3>
              <p className="text-gray-600">
                Skontaktujemy się z Tobą w ciągu 24 godzin.
              </p>
            </div>
          </div>
        </section>
    );
  }

  return (
      <section id="kontakt" className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Masz pomysł na <span className="text-orange-500">wydarzenie?</span>
            </h2>
            <p className="text-xl text-gray-600">
              Skontaktuj się z nami, aby otrzymać bezpłatną wycenę i poznać nasze kreatywne propozycje.
              Razem stworzymy coś wyjątkowego.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Imię *
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-300"
                    placeholder="Twoje imię"
                    disabled={submitting}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail *
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-300"
                    placeholder="twoj@email.com"
                    disabled={submitting}
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Telefon
              </label>
              <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-300"
                  placeholder="+48 123 456 789"
                  disabled={submitting}
              />
            </div>

            <div className="mb-8">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Wiadomość *
              </label>
              <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-300"
                  placeholder="Opowiedz nam o swoim pomyśle na wydarzenie..."
                  disabled={submitting}
              />
            </div>

            {errorMsg && (
                <p className="mb-4 text-red-600 text-sm">{errorMsg}</p>
            )}

            <button
                type="submit"
                disabled={submitting}
                className="w-full group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-orange-500 hover:bg-orange-600 disabled:opacity-70 disabled:cursor-not-allowed rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {submitting ? 'Wysyłanie…' : 'Bezpłatna konsultacja'}
              <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </form>
        </div>
      </section>
  );
};

export default Contact;