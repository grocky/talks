## Docker Internals

#### A deeper look into docker internals.

[by grocky](https://twitter.com/RockyGJr)

----

## Docker Components

![docker-engine](img/engine-components-flow.png)

--

* **daemon** (e.g. `dockerd`)
* **API**
* **CLI** (e.g. `docker`)

--

![docker-architecture](img/architecture.svg)

----

## How are images built?

* Dockerfile -> image layers
* image layer dependencies
* intermediate layers
* image layer caches

----

## Docker image data storage

```shell
screen ~/Library/Containers/com.docker.docker/Data/com.docker.driver.amd64-linux/tty
```

```shell
cd /var/lib/docker/overlay2
```

----


## Exploring docker's filesystem

> Demo
