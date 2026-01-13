# Notes App -- Documentație Tehnică

## 1. Prezentare Generală
Aplicația **Notes App** este o platformă modernă pentru gestionarea și stocarea notițelor personale în cloud. Proiectul utilizează **React** pentru interfață și **Firebase Realtime Database** pentru stocarea datelor. Comunicarea este realizată exclusiv prin **Firebase REST API**, respectând o arhitectură client-side modulară.

## 2. Obiective Tehnice
* **Arhitectură modernă**: Construită pe React 18 și Vite.
* **REST API**: Operațiuni CRUD (Create, Read, Update, Delete) fără SDK-uri externe.
* **Polling**: Sincronizare automată a datelor la fiecare 30 de secunde.
* **Securitate**: Gestionarea URL-ului prin variabile de mediu (`VITE_FIREBASE_URL`).

## 3. Funcționalități
* **Gestiune Completă (CRUD)**: Adăugare, vizualizare, editare și ștergere notițe.
* **Organizare**: Clasificarea notițelor prin tag-uri (*Personal*, *Work*, *Ideas*).
* **Căutare**: Filtrare în timp real după conținut sau categorie.
* **UI Responsiv**: Interfață adaptabilă pentru mobil și desktop folosind CSS Grid.

## 4. Tehnologii Utilizate
### Frontend
* **React 18**: Hooks (`useState`, `useEffect`).
* **Vite**: Build tool rapid.
* **Vitest**: Testare unitară pentru API.

### Backend (Serverless)
* **Firebase Realtime Database**: Stocare JSON.
* **Firebase REST API**: Protocol HTTPS.

## 5. Arhitectură Aplicație
Aplicația urmează un flux de date unidirecțional:
1. **Client (React)** solicită date via `api.js`.
2. **API Service** comunică prin REST cu **Firebase**.
3. **Firebase** returnează obiecte JSON care actualizează starea aplicației.

## 6. Documentație API (Firebase REST)
| Metodă | Endpoint | Descriere |
| :--- | :--- | :--- |
| **GET** | `/notes.json` | Preia toate notițele. |
| **POST** | `/notes.json` | Salvează o notiță nouă. |
| **PATCH** | `/notes/:id.json` | Actualizează o notiță. |
| **DELETE** | `/notes/:id.json` | Șterge o notiță. |

## 7. Instrucțiuni de Rulare Locală
1. Clonează repository-ul.
2. Rulează `npm install` pentru instalarea dependențelor.
3. Creează un fișier `.env.local` și adaugă `VITE_FIREBASE_URL=https://notes-app-e743d-default-rtdb.europe-west1.firebasedatabase.app/notes.json`.
4. Rulează `npm run dev` pentru a porni aplicația local.