FROM centos:7

##
## config docker-in-docker
RUN set -eu \
  && yum-config-manager --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo \
  && yum install -y \
    docker-ce \
    docker-ce-cli \
    containerd.io \
  && yum clean all

COPY src/config-docker.sh /usr/local/bin/
COPY src/config.sh /usr/local/bin/

ENTRYPOINT [ "/usr/local/bin/config.sh" ]
