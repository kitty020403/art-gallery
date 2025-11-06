'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function MonProfil() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  // Données utilisateur (exemple tunisien)
  const userData = {
    nomComplet: "Sarah Mr",
    email: "Sarah.Mr@gmail.com",
    telephone: "+216 12 345 678",
    adresse: "15 Rue Habib Bourguiba, Tunis",
    dateInscription: "15 Mars 2025",
    ticketsSoumis: 24,
    ticketsResolus: 16,
    avatar: "https://randomuser.me/api/portraits/women/17.jpg"
  };

  const [formData, setFormData] = useState({
    nomComplet: userData.nomComplet,
    telephone: userData.telephone,
    adresse: userData.adresse
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici vous ajouteriez la logique pour sauvegarder les modifications
    setIsEditing(false);
    alert("Profil mis à jour avec succès!");
  };

  return (
    <div className="d-flex min-vh-100" style={{
      background: '#001026',
      padding: '2rem 0'
    }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {/* Carte Profil */}
            <div className="card shadow-lg border-0 mb-4" style={{
              backdropFilter: 'blur(8px)',
              backgroundColor: 'rgba(255, 255, 255, 0.85)'
            }}>
              <div className="card-header border-0 bg-transparent">
                <h2 className="mb-0 text-center fw-bold" style={{ color: '#39395e' }}>
                  <i className="bi bi-person-circle me-2"></i>
                  Mon Profil
                </h2>
              </div>
              
              <div className="card-body">
                <div className="row">
                  {/* Colonne Photo */}
                  <div className="col-md-4 text-center mb-4 mb-md-0">
                    <img 
                      src={userData.avatar} 
                      alt="Photo de profil" 
                      className="rounded-circle mb-3 border" 
                      width="150" 
                      height="150"
                      style={{ 
                        borderColor: 'rgba(185, 87, 151, 0.3)',
                        objectFit: 'cover'
                      }}
                    />
                    <input type="file" className="form-control form-control-sm mt-2" />
                    <div className="mt-3">
                      <span className="badge" style={{ backgroundColor: '#4338ca' }}>Utilisateur Standard</span>
                    </div>
                    <div className="mt-4">
                      <div className="d-flex justify-content-between border-bottom py-2">
                        <span className="text-muted">Membre depuis</span>
                        <span>{userData.dateInscription}</span>
                      </div>
                      <div className="d-flex justify-content-between border-bottom py-2">
                        <span className="text-muted">Tickets soumis</span>
                        <span>{userData.ticketsSoumis}</span>
                      </div>
                      <div className="d-flex justify-content-between border-bottom py-2">
                        <span className="text-muted">Tickets résolus</span>
                        <span>{userData.ticketsResolus}</span>
                      </div>
                    </div>
                  </div>

                  {/* Colonne Formulaire */}
                  <div className="col-md-8">
                    {isEditing ? (
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label className="form-label fw-bold" style={{ color: '#39395e' }}>Nom complet</label>
                          <input
                            type="text"
                            className="form-control"
                            name="nomComplet"
                            value={formData.nomComplet}
                            onChange={handleChange}
                            style={{ borderColor: 'rgba(185, 87, 151, 0.3)' }}
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label fw-bold" style={{ color: '#39395e' }}>Email</label>
                          <input
                            type="email"
                            className="form-control"
                            value={userData.email}
                            disabled
                            style={{ borderColor: 'rgba(185, 87, 151, 0.3)' }}
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label fw-bold" style={{ color: '#39395e' }}>Téléphone</label>
                          <input
                            type="tel"
                            className="form-control"
                            name="telephone"
                            value={formData.telephone}
                            onChange={handleChange}
                            style={{ borderColor: 'rgba(185, 87, 151, 0.3)' }}
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label fw-bold" style={{ color: '#39395e' }}>Adresse</label>
                          <textarea
                            className="form-control"
                            name="adresse"
                            rows="3"
                            value={formData.adresse}
                            onChange={handleChange}
                            style={{ borderColor: 'rgba(185, 87, 151, 0.3)' }}
                          ></textarea>
                        </div>

                        <div className="d-flex justify-content-end gap-2">
                          <button 
                            type="button" 
                            className="btn btn-sm"
                            style={{ 
                              backgroundColor: 'rgba(106, 13, 173, 0.1)',
                              color: '#39395e'
                            }}
                            onClick={() => setIsEditing(false)}
                          >
                            Annuler
                          </button>
                          <button 
                            type="submit" 
                            className="btn btn-sm"
                            style={{ 
                              background: '#001026',
                              color: 'white'
                            }}
                          >
                            Enregistrer
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div>
                        <div className="mb-4">
                          <h5 style={{ color: '#39395e' }}>{userData.nomComplet}</h5>
                          <p className="text-muted mb-1">
                            <i className="bi bi-envelope me-2"></i>
                            {userData.email}
                          </p>
                          <p className="text-muted mb-1">
                            <i className="bi bi-telephone me-2"></i>
                            {userData.telephone}
                          </p>
                          <p className="text-muted">
                            <i className="bi bi-geo-alt me-2"></i>
                            {userData.adresse}
                          </p>
                        </div>

                        <div className="d-flex gap-2">
                          <button 
                            className="btn btn-sm"
                            style={{ 
                              background: '#001026',
                              color: 'white'
                            }}
                            onClick={() => setIsEditing(true)}
                          >
                            <i className="bi bi-pencil-square me-2"></i>
                            Modifier le profil
                          </button>

                          <button 
                            className="btn btn-sm"
                            style={{ 
                              backgroundColor: 'rgba(106, 13, 173, 0.1)',
                              color: '#39395e'
                            }}
                            onClick={() => router.push('/mes-tickets')}
                          >
                            <i className="bi bi-ticket-detailed me-2"></i>
                            Voir mes tickets
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Section Sécurité */}
            <div className="card shadow-lg border-0" style={{
              backdropFilter: 'blur(8px)',
              backgroundColor: 'rgba(255, 255, 255, 0.85)'
            }}>
              <div className="card-header border-0 bg-transparent">
                <h5 className="mb-0 fw-bold" style={{ color: '#39395e' }}>
                  <i className="bi bi-shield-lock me-2"></i>
                  Sécurité du compte
                </h5>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h6 className="mb-1">Changer le mot de passe</h6>
                    <small className="text-muted">Dernière modification il y a 3 mois</small>
                  </div>
                  <button 
                    className="btn btn-sm"
                    style={{ 
                      backgroundColor: 'rgba(106, 13, 173, 0.1)',
                      color: '#39395e'
                    }}
                    onClick={() => router.push('/changer-mot-de-passe')}
                  >
                    Modifier
                  </button>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">Authentification à deux facteurs</h6>
                    <small className="text-muted">Non activée</small>
                  </div>
                  <div className="form-check form-switch">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      style={{ 
                        backgroundColor: '#39395e',
                        borderColor: '#39395e'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}