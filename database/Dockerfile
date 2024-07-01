FROM postgres:15.1

RUN export DEBIAN_FRONTEND=noninteractive && \
  apt-get update  -qq && \
  apt-get install -qqy \
  cron \
  rsyslog
# barman-cli

COPY ./docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh

# COPY scripts .
COPY startup.sh /startup.sh
COPY goal_tables.sql /docker-entrypoint-initdb.d/

RUN chmod +x /startup.sh
RUN sed -i '/imklog/s/^/#/' /etc/rsyslog.conf

ENTRYPOINT ["/startup.sh"]
CMD ["postgres"]
