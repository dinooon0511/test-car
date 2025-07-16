🚗 Car Manager SPA (React + Vite + TypeScript)

Минималистичное SPA-приложение для просмотра, сортировки, редактирования и удаления автомобилей с отображением на карте.


✨ Функционал
- Просмотр списка машин (name, model, year, price)
- Сортировка по году и цене (возрастание/убывание)
- Редактирование name и price (с локальным сохранением)
- Удаление машин (с локальным сохранением)
- Карта с маркерами авто по координатам (Leaflet)
- Современный дизайн, адаптивность, плавный UX


🛠️ Технологии
- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React-Leaflet](https://react-leaflet.js.org/) + [Leaflet](https://leafletjs.com/)
- CSS (минималистичный дизайн, цветовая палитра)


🚀 Быстрый старт

1. **Клонируй репозиторий и перейди в папку проекта:**
   ```bash
   git clone <your-repo-url>
   cd test-car
   ```
2. **Установи зависимости:**
   ```bash
   npm install
   ```
3. **Запусти проект:**
   ```bash
   npm run dev
   ```
4. **Открой в браузере:**
   [http://localhost:5173](http://localhost:5173)


🗺️ Карта
- Используется OpenStreetMap через Leaflet.
- Маркеры отображаются только для машин с координатами `latitude` и `longitude`.


📁 Структура проекта
```
src/
  components/        // Компоненты интерфейса (список, форма, карта)
  services/          // Работа с API
  utils/             // Вспомогательные функции и типы
  App.tsx            // Главный компонент
  main.tsx           // Точка входа
  App.css            // Глобальные стили
```


📸 Скриншот

<img width="500" height="auto" alt="image" src="https://github.com/user-attachments/assets/5be2e687-fa72-4371-aa41-964f55667105" />


---


