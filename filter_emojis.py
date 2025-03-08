import json
import re
import os

def filter_emojis(filepath):
    """
    Reads a JSON file of emojis, filters out entries with "type-x" in their name,
    and writes the updated data back to the file.

    Args:
        filepath: The path to the emojibase.json file.
    """
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            emoji_data = json.load(f)
    except FileNotFoundError:
        print(f"Error: File not found at {filepath}")
        return
    except json.JSONDecodeError:
        print(f"Error: Invalid JSON format in {filepath}")
        return

    # Filter out emojis with "type-x" or "type-x-x" in their name
    filtered_emoji_data = [
        emoji for emoji in emoji_data if emoji.get('group') != 'flags'
    ]

    try:
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(filtered_emoji_data, f, indent=2, ensure_ascii=False)
        print("File updated successfully!")
    except IOError:
        print(f"Error: Could not write to {filepath}")

# Get the directory of the current script
script_dir = os.path.dirname(os.path.abspath(__file__))

# Construct the path to emojibase.json relative to the script's directory
emoji_filepath = os.path.join(script_dir, 'src', 'emojibase.json')

# Call the function to filter the emojis
filter_emojis(emoji_filepath)
