<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>



# WellTrack

WellTrack is a full-stack web application built with Laravel (backend API) and React (frontend SPA). The platform enables users to monitor wellness data, view their progress, and manage profiles through a sleek and responsive interface.

## 🚀 Live Demo

Check out the deployed app here:  
🔗 [https://welltrack.netlify.app/profile](https://welltrack.netlify.app/profile)

##  Tech Stack

- **Frontend**: React + Vite
- **Backend**: Laravel (API-first architecture)
- **Database**: PostgreSQL hosted on Railway
- **Deployment**:
  - **Frontend**: Netlify
  - **Backend**: Railway (including Laravel API and PostgreSQL DB)
- **Containerization**: Docker

## 📁 Project Structure

- `/client` - React frontend powered by Vite  
- `/server` - Laravel backend with Sanctum authentication and API routes

## 🔧 Environment Variables

Ensure the following `.env` values are configured for production:

### Laravel Backend (`/server`)




## 🐳 Docker Support

This project comes Docker-ready. Use the provided Dockerfiles and `docker-compose.yml` to spin up the app locally for development or staging.

##  Setup & Deployment Scripts

Scripts are available to automate builds and deployment for both Netlify (frontend) and Railway (backend).

## Feedback

Have suggestions or spotted an issue? PRs and feedback welcome!

---

copyright vicmass@2025
