FROM node:22 as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build -- --base-href /bus-payment-manager/

FROM nginx:alpine
COPY --from=builder /app/dist/bus-payment-manager-frontend/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]