from pytube import YouTube
import os

# url input from user
try:
    yt = YouTube(str(input("Enter the URL of the video you want to download: \n>> ")))
except:
    raise Exception("There Was An Error: Check If The Video URL Was Valid.")

# extract only audio
video = yt.streams.filter(only_audio=True).first()

# check for destination to save file
print("Enter the destination (leave blank or enter '.' for current directory)")
destination = str(input(">> ")) or '.'

# download the file
out_file = video.download(output_path=destination)

# save the file
base, ext = os.path.splitext(out_file)
new_file = base + '.mp3'
os.rename(out_file, new_file)

# result of success
print(yt.title + " has been successfully downloaded.")