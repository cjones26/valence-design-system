import re
import shutil
import sys
from pathlib import Path, PurePosixPath
from zipfile import ZipFile

MAX_FILE_SIZE = 5 * 1024 * 1024
MAX_TOTAL_SIZE = 100 * 1024 * 1024
MAX_FILES = 3000
FILE_PATTERN = re.compile(
    r"^(.*/)?[^/]+-(light|dark)-(actual|diff|expected)\.png$"
)

archive_path = Path(sys.argv[1])
output_path = Path(sys.argv[2])

with ZipFile(archive_path) as archive:
    files = [entry for entry in archive.infolist() if not entry.is_dir()]
    names = {entry.filename for entry in files}

    if len(files) > MAX_FILES:
        raise ValueError("The visual artifact contains too many files.")

    if len(names) != len(files):
        raise ValueError("The visual artifact contains duplicate files.")

    total_size = sum(entry.file_size for entry in files)

    if total_size > MAX_TOTAL_SIZE:
        raise ValueError("The visual artifact exceeds the expanded size limit.")

    for entry in files:
        entry_path = PurePosixPath(entry.filename)

        if (
            entry.file_size > MAX_FILE_SIZE
            or entry_path.is_absolute()
            or ".." in entry_path.parts
            or entry.filename != entry_path.as_posix()
            or "\\" in entry.filename
            or not FILE_PATTERN.fullmatch(entry.filename)
        ):
            raise ValueError(f"Unexpected visual artifact entry: {entry.filename}")

        destination = output_path.joinpath(*entry_path.parts)
        destination.parent.mkdir(parents=True, exist_ok=True)

        with archive.open(entry) as source, destination.open("wb") as target:
            shutil.copyfileobj(source, target)
