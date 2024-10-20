import {List, ListItem, Text, Box, IconButton, Button} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

import '../App.css';

const ItemList = ({ items, onEdit, onDelete }) => {
    return (
        <List spacing={3}>
            {items.map((item) => (
                <ListItem
                    key={item.id}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    p={2}
                    borderWidth="1px"
                    borderRadius="md"
                >
                    <Box>
                        <Text className="list-item-text">{item.value}</Text>
                    </Box>
                    <Box flexShrink={0}>
                        <Button
                            aria-label="Edit item"
                            leftIcon={<EditIcon />}
                            mr={2}
                            size="sm"
                            onClick={() => onEdit(item)}
                            display={{ base: 'none', sm: 'inline-flex' }}
                        >
                            Edit
                        </Button>
                        <IconButton
                            aria-label="Edit item"
                            icon={<EditIcon />}
                            mr={2}
                            size="sm"
                            onClick={() => onEdit(item)}
                            display={{ base: 'inline-flex', sm: 'none' }}
                        />

                        <Button
                            aria-label="Delete item"
                            leftIcon={<DeleteIcon />}
                            size="sm"
                            onClick={() => onDelete(item.id)}
                            display={{ base: 'none', sm: 'inline-flex' }}
                        >
                            Delete
                        </Button>
                        <IconButton
                            aria-label="Delete item"
                            icon={<DeleteIcon />}
                            size="sm"
                            onClick={() => onDelete(item.id)}
                            display={{ base: 'inline-flex', sm: 'none' }}
                        />
                    </Box>
                </ListItem>
            ))}
            {!items.length && <Text as='i'>All done! Time to relax… or add a new task?</Text>}
        </List>
    );
};

export default ItemList;