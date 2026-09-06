# nguyen-tien-huy · portfolio

k9s-style landing page for [Nguyen Tien Huy](https://github.com/myuh250) — DevOps & Infrastructure Engineer, AWS SAA-C03.

Content is sourced from the Harvard-format CV in `../CV`. The UI is a static cluster console: workloads, certs, skills, and ingress map to experience, certifications, skills, and contact. The downloadable PDF is served as `/nguyen-tien-huy-devops.pdf` (or `/myuh-porfolio/nguyen-tien-huy-devops.pdf` on GitHub Pages).

## Run locally

```bash
npm install
npm run dev
```

Opens at http://localhost:5173

```bash
npm run build
npm run preview
```

## Keyboard (k9s-ish)

| Key | Action |
|---|---|
| `0`–`4` | change view (overview / workloads / ingress / certs / skills) |
| `j` `k` / arrows | next/prev row (on overview: next/prev view) |
| `y` | copy selected resource as YAML |
| `d` | download CV PDF |
| click terminal | skip typewriter |

Deep links: `#overview` `#workloads` `#ingress` `#certs` `#skills`

## Container

```bash
docker build -t portfolio:local .
docker run --rm -p 8080:80 portfolio:local
```

## Kubernetes

Update the image in `k8s/deployment.yaml`, then:

```bash
kubectl apply -f k8s/
```

The Ingress host `huyng2724.dev` is a placeholder — change it before apply.

## GitHub Pages

Pushes to `main` build `porf/` and publish to Pages:

https://myuh250.github.io/myuh-porfolio/

Enable once: **Repo → Settings → Pages → Source: GitHub Actions**.
