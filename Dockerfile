FROM node:11-alpine
WORKDIR /app
RUN ["yarn", "install"]
CMD ["sh"]