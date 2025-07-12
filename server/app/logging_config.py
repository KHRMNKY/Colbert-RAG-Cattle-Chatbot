import logging
import sys

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('indexer.log'),
        logging.StreamHandler(sys.stdout)
    ]
)


logger = logging.getLogger(__name__)