#!/bin/bash

# Set the root directory (current directory by default)
ROOT_DIR="."

# Ensure the root directory exists
if [ ! -d "$ROOT_DIR" ]; then
  echo "Error: Root directory '$ROOT_DIR' does not exist."
  exit 1
fi

# Function to generate a files.json inside each folder
generate_json() {
    local folder="$1"
    local output_file="$folder/files.json"

    # Find all files in the current folder (not subfolders)
    files=()
    while IFS= read -r file; do
        files+=("\"$(basename "$file")\"")
    done < <(find "$folder" -maxdepth 1 -type f ! -name "files.json")

    # Write JSON output
    echo "[" > "$output_file"
    if [ ${#files[@]} -gt 0 ]; then
        printf "  %s\n" "$(IFS=,; echo "${files[*]}")" >> "$output_file"
    fi
    echo "]" >> "$output_file"

    echo "✅ Generated: $output_file"
}

# Export function to be used in find command
export -f generate_json

# Find all directories and run the function
find "$ROOT_DIR" -type d -exec bash -c 'generate_json "$0"' {} \;
