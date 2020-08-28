# NOT required, just an example config for custom image
FROM getmeili/meilisearch:v0.13.0

VOLUME [ "/meili-data" ]

ENV MEILI_HTTP_ADDR=0.0.0.0:80 \ 
    MEILI_MASTER_KEY="super_secret" \
    MEILI_ENV="production" \
    MEILI_DB_PATH="./meili-data"

EXPOSE 80

CMD ["./meilisearch"]

