FROM python:3.12.4-slim-bullseye as install-browser

RUN apt-get update \
    && apt-get satisfy -y \
    "chromium, chromium-driver (>= 115.0)" \
    && chromium --version && chromedriver --version

RUN apt-get update \
    && apt-get install -y --fix-missing firefox-esr wget \
    && wget https://github.com/mozilla/geckodriver/releases/download/v0.33.0/geckodriver-v0.33.0-linux64.tar.gz \
    && tar -xvzf geckodriver* \
    && chmod +x geckodriver \
    && mv geckodriver /usr/local/bin/

# Install build tools
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

FROM install-browser as backend-install

ENV PIP_ROOT_USER_ACTION=ignore

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY ./requirements.txt ./requirements.txt
RUN pip install -r requirements.txt

FROM backend-install AS backend

RUN useradd -ms /bin/bash backend \
    && chown -R backend:backend /usr/src/app

USER backend

COPY --chown=backend:backend ./apps/ ./apps/
COPY --chown=backend:backend ./common/ ./common/
COPY --chown=backend:backend ./models/ ./models/


EXPOSE 8000
CMD ["uvicorn", "apps.server.src.app-2:app", "--host", "0.0.0.0", "--port", "8000"]