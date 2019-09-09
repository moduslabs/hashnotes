#!/bin/bash
set -euo pipefail

# Set debug mode (verbose and xtrace)
"${DEBUG:-false}" && set -vx
export PS4="+(${BASH_SOURCE}:${LINENO}): ${FUNCNAME[0]:+${FUNCNAME[0]}(): }"

# Define bash source directory
SOURCE_DIR="${BASH_SOURCE[0]}"
while [ -h "${SOURCE_DIR}" ]; do
  BASH_SOURCE_DIR="$(cd -P "$(dirname "${SOURCE_DIR}")" >/dev/null 2>&1 && pwd)"
  SOURCE_DIR="$(readlink "${SOURCE_DIR}")"
  [[ ${SOURCE_DIR} != /* ]] && SOURCE_DIR="${BASH_SOURCE_DIR}/${SOURCE_DIR}"
done
BASH_SOURCE_DIR="$(cd -P "$(dirname "$SOURCE_DIR" )" >/dev/null 2>&1 && pwd)"

# Define relative directories
PROJECT_BIN_DIR="${BASH_SOURCE_DIR}"
PROJECT_DIR="${PROJECT_BIN_DIR}/.."

# Define variables
[[ "${GITHUB_REF}" == "refs/heads/master" ]] && NETLIFY_PROD_FLAG="--prod" || NETLIFY_PROD_FLAG=""

# Run commands
cd "${PROJECT_DIR}" && "${PROJECT_DIR}/node_modules/.bin/netlify" deploy --dir "www" --message "${GITHUB_REF}" --json ${NETLIFY_PROD_FLAG}
