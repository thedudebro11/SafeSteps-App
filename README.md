# SafeSteps — React Native (Expo) App

Production-ready mobile app for a privacy-first GPS tracker with Emergency mode, family plans,
and shareable history links. This app talks to your SafeSteps backend (Express) and Supabase.

## Quickstart
```bash
npm i -g expo-cli eas-cli
npm install
npm run start
```
Configure `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `API_BASE_URL` in `app.json -> expo.extra`.

## Build
```bash
eas build -p android --profile production
eas build -p ios --profile production
```
