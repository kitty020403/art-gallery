'use client';
import { useRouter } from 'next/navigation';

export default function ProfilAdmin() {
  const router = useRouter();

  // Données de l'administrateur
  const adminData = {
    nomComplet: "Malek Belcheikh",
    email: "admin@entreprise.tn",
    telephone: "+216 12 345 678",
    role: "Administrateur Principal",
    dateInscription: "15/03/2022",
    derniereConnexion: "Aujourd'hui à 10:30",
    ticketsTraites: 247,
    avatar: "https://randomuser.me/api/portraits/women/63.jpg"
  };

  return (
    <div className="d-flex min-vh-100" style={{
      background: 'linear-gradient(135deg, #000f3f 0%, #001a66 100%)',
      backdropFilter: 'blur(2px)'
    }}>
      {/* Barre latérale identique */}
      <aside style={{
        width: "260px",
        background: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(10px)",
        borderRight: "1px solid rgba(118, 75, 162, 0.1)",
        boxShadow: "2px 0 15px rgba(0, 0, 0, 0.05)"
      }}>
        <div className="p-4 border-bottom d-flex align-items-center">
          <i className="bi bi-layers fs-3 text-primary me-2"></i>
          <span className="fw-bold fs-4" style={{ color: '#000f3f' }}>Admin</span>
        </div>
        <nav>
          <div className="mt-3">
            <div className="text-muted text-uppercase px-4 mb-2 small">Navigation</div>
            <ul className="nav flex-column">
              <li className="nav-item">
                <button className="nav-link px-4 py-2 d-flex align-items-center rounded text-start w-100 border-0"
                  style={{ color: '#000f3f' }}
                  onClick={() => router.push('/admin')}>
                  <i className="bi bi-speedometer2 me-2"></i>Tableau de bord
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link px-4 py-2 d-flex align-items-center rounded text-start w-100 border-0"
                  style={{ color: '#000f3f', backgroundColor: 'rgba(0, 15, 63, 0.1)' }}>
                  <i className="bi bi-person-gear me-2"></i>Mon Profil
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </aside>

      {/* Contenu principal */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* Barre supérieure identique */}
        <header className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom bg-white">
          <div className="d-flex align-items-center">
              <h5 className="mb-0 fw-bold" style={{ color: '#000f3f' }}>
              <i className="bi bi-person-gear me-2"></i>
              Profil Administrateur
            </h5>
          </div>
          <div className="d-flex align-items-center gap-3">
            <i className="bi bi-bell fs-5" style={{ color: '#000f3f' }}></i>
            <div className="d-flex align-items-center">
              <span className="me-2 fw-bold" style={{ color: '#000f3f' }}>{adminData.nomComplet}</span>
              <img src={adminData.avatar} alt="Admin" 
                className="rounded-circle border" width="36" height="36"
                style={{ borderColor: 'rgba(118, 75, 162, 0.3)' }} />
            </div>
          </div>
        </header>

        {/* Section Profil */}
        <main className="p-4 flex-grow-1">
          <div className="row">
            {/* Colonne de gauche - Photo et stats */}
            <div className="col-md-4 mb-4">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body text-center">
                  <img src={adminData.avatar} alt="Admin" 
                    className="rounded-circle mb-3 border" width="120" height="120"
                    style={{ borderColor: 'rgba(118, 75, 162, 0.3)', objectFit: 'cover' }} />
                  
                  <h4 style={{ color: '#000f3f' }}>{adminData.nomComplet}</h4>
                  <span className="badge bg-danger">{adminData.role}</span>

                  <div className="mt-4">
                    <div className="d-flex justify-content-between py-2 border-bottom">
                      <span className="text-muted">Membre depuis</span>
                      <span>{adminData.dateInscription}</span>
                    </div>
                    <div className="d-flex justify-content-between py-2 border-bottom">
                      <span className="text-muted">Dernière connexion</span>
                      <span>{adminData.derniereConnexion}</span>
                    </div>
                    <div className="d-flex justify-content-between py-2 border-bottom">
                      <span className="text-muted">Tickets traités</span>
                      <span className="fw-bold" style={{ color: '#000f3f' }}>{adminData.ticketsTraites}</span>
                    </div>
                  </div>

                  <button className="btn btn-sm mt-3 w-100" 
                    style={{ 
                      backgroundColor: 'rgba(220, 53, 69, 0.1)',
                      color: '#dc3545'
                    }}>
                    <i className="bi bi-trash me-2"></i> Supprimer le compte
                  </button>
                </div>
              </div>
            </div>

            {/* Colonne de droite - Formulaire */}
            <div className="col-md-8">
              <div className="card shadow-sm border-0">
                <div className="card-header bg-white d-flex justify-content-between align-items-center">
                  <h6 className="mb-0 fw-bold" style={{ color: '#000f3f' }}>
                    <i className="bi bi-pencil-square me-2"></i>
                    Modifier le profil
                  </h6>
                </div>
                <div className="card-body">
                  <form>
                    <div className="row mb-3">
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold" style={{ color: '#000f3f' }}>Nom complet</label>
                        <input type="text" className="form-control" 
                          defaultValue={adminData.nomComplet}
                          style={{ borderColor: 'rgba(118, 75, 162, 0.3)' }} />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold" style={{ color: '#6a0dad' }}>Email</label>
                        <input type="email" className="form-control" 
                          defaultValue={adminData.email}
                          style={{ borderColor: 'rgba(118, 75, 162, 0.3)' }} />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold" style={{ color: '#6a0dad' }}>Téléphone</label>
                        <input type="tel" className="form-control" 
                          defaultValue={adminData.telephone}
                          style={{ borderColor: 'rgba(118, 75, 162, 0.3)' }} />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold" style={{ color: '#6a0dad' }}>Photo de profil</label>
                        <input type="file" className="form-control" 
                          style={{ borderColor: 'rgba(118, 75, 162, 0.3)' }} />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold" style={{ color: '#6a0dad' }}>À propos</label>
                      <textarea className="form-control" rows="3"
                        style={{ borderColor: 'rgba(118, 75, 162, 0.3)' }}
                        placeholder="Décrivez votre rôle..."></textarea>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold" style={{ color: '#6a0dad' }}>Changer le mot de passe</label>
                      <input type="password" className="form-control mb-2" 
                        placeholder="Nouveau mot de passe"
                        style={{ borderColor: 'rgba(118, 75, 162, 0.3)' }} />
                      <input type="password" className="form-control" 
                        placeholder="Confirmer le mot de passe"
                        style={{ borderColor: 'rgba(118, 75, 162, 0.3)' }} />
                    </div>

                    <div className="d-flex justify-content-end mt-4">
                      <button type="button" className="btn btn-light me-2"
                        style={{ color: '#6a0dad', borderColor: 'rgba(118, 75, 162, 0.3)' }}>
                        Annuler
                      </button>
                      <button type="submit" className="btn"
                        style={{ 
                          background: 'linear-gradient(135deg, #000f3f 0%, #001a66 100%)',
                          color: 'white'
                        }}>
                        Enregistrer les modifications
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Section Sécurité */}
              <div className="card shadow-sm border-0 mt-4">
                <div className="card-header bg-white d-flex justify-content-between align-items-center">
                  <h6 className="mb-0 fw-bold" style={{ color: '#000f3f' }}>
                    <i className="bi bi-shield-lock me-2"></i>
                    Sécurité du compte
                  </h6>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <h6 className="mb-1">Authentification à deux facteurs</h6>
                      <small className="text-muted">Améliorez la sécurité de votre compte</small>
                    </div>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" 
                        style={{ backgroundColor: '#000f3f', borderColor: '#000f3f' }} />
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <h6 className="mb-1">Sessions actives</h6>
                      <small className="text-muted">2 appareils connectés</small>
                    </div>
                    <button className="btn btn-sm" 
                      style={{ color: '#000f3f', backgroundColor: 'rgba(0, 15, 63, 0.1)' }}>
                      Voir tout
                    </button>
                  </div>

                  <button className="btn btn-sm w-100 mt-2"
                    style={{ 
                      color: '#dc3545',
                      backgroundColor: 'rgba(220, 53, 69, 0.1)'
                    }}>
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Déconnexion de tous les appareils
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}