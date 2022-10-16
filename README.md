# carboncalc

![GitHub Actions status](https://github.com/hannahyek/eco2mmerce/actions/workflows/ci.yml/badge.svg)

## Installation

```bash
git clone https://github.com/hannahyek/eco2mmerce/
cd carbon-calc

# Install dependencies for Flask
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Install dependencies for React
yarn

# Exit out of virtual environment
deactivate
```

## Usage

```bash
# Run the development server
yarn workspaces run dev

# Lint and format code
yarn workspaces run lint
yarn workspaces run format

```

## Build

```bash
# Build the app
yarn workspaces run build

docker compose up
```

## License

[MIT](https://choosealicense.com/licenses/mit)
