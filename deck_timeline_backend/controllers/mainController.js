import axios from 'axios';

export const getRootMessage = (req, res) => {
  res.json({ message: "Hello from the Deck Timeline Backend" });
};

export const getGanttData = async (req, res) => {
  const authHeader = req.headers.authorization;
  const { boardId } = req.params;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({ message: 'Authentication credentials are required.' });
  }

  if (!boardId) {
    return res.status(400).json({ message: 'Board ID is required.' });
  }

  console.log(`Fetching live data for board: ${boardId}`);
  
  const nextcloudApiUrl = `http://nextclouddev/index.php/apps/deck/api/v1.0/boards/${boardId}/stacks`;

  try {
    const response = await axios.get(nextcloudApiUrl, {
      headers: {
        'Authorization': authHeader,
        'Accept': 'application/json',
        'OCS-APIRequest': 'true'
      }
    });

    const stacks = response.data;
    const allCards = stacks.flatMap(stack => stack.cards);

    const transformedData = allCards.map(card => ({
      id: card.id,
      name: card.title,
      start: card.lastModified,
      end: card.duedate,
      progress: 0
    }));

    res.json(transformedData);

  } catch (error) {
    console.error("Error fetching data from Nextcloud API:", error.message);
    
    if (error.response && error.response.status === 401) {
      return res.status(401).json({ message: 'Invalid credentials. Authentication with Nextcloud failed.' });
    }
    
    res.status(500).json({ message: 'An error occurred while fetching data from the Nextcloud API.' });
  }
};
