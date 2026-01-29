## Python 3.13 note

Python 3.13 removed the stdlib `audioop` module; `pydub` may fail unless `pyaudioop` is installed.
This pipeline avoids pydub and uses ffmpeg/ffprobe via `imageio-ffmpeg` instead.
