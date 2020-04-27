# Corona Helfer (corona-helfer)

The Node.js/Express based backend for Corona Helfer.

* Backend repository:<br>
  https://github.com/n1ghty1993/Coronahelfer-Hackathon
* Frontend repository:<br>
  https://github.com/n1ghty1993/Coronahelfer-Front-Vue

## Building from Source
### Install the dependencies
```bash
npm install
```

### Start the app in development mode
Required environment variables:
* `GOOGLE_API_KEY`

```bash
docker-compose up
npm run dev
```

### Start the app in production mode
Required environment variables:
* `GOOGLE_API_KEY`
* `BINDING` with the configuration for the database connection - use
[binding.json](docs/binding.json) as template for the variable value.

```bash
npm start
```
