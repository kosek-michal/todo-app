import { useState } from 'react';
import {
    Box,
    Button,
    Heading,
    Spinner,
    useToast,
    useDisclosure, IconButton, Text,
} from '@chakra-ui/react';
import InfiniteScrollTrigger from './components/InfiniteScrollTrigger.jsx';
import ItemModal from './components/ItemModal.jsx';
import ItemList from './components/ItemList.jsx';
import DeleteConfirmationDialog from './components/DeleteConfirmationDialog.jsx';
import { getItems, addItem, updateItem, deleteItem } from './api';
import { showSuccessToast, showErrorToast } from './toastHelpers';
import { AddIcon } from "@chakra-ui/icons";

function App() {
    const [items, setItems] = useState([]);
    const [nextIdx, setNextIdx] = useState(0);
    const [loading, setLoading] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [currentItem, setCurrentItem] = useState(null);
    const [modalLoading, setModalLoading] = useState(false);

    const toast = useToast();

    const {
        isOpen: isAlertOpen,
        onOpen: onAlertOpen,
        onClose: onAlertClose,
    } = useDisclosure();
    const [itemToDelete, setItemToDelete] = useState(null);

    const loadItems = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const data = await getItems(nextIdx);
            const { items: newItems, next_idx } = data;
            setItems((prevItems) => [...prevItems, ...newItems]);
            setNextIdx(next_idx);
            setLoading(false);
        } catch (err) {
            console.error(err);
            showErrorToast(toast, 'An error occurred while fetching items.');
            setTimeout(() => {
                setLoading(false);
            }, 6000);
        }
    };

    const handleAddClick = () => {
        setModalMode('add');
        setCurrentItem(null);
        setModalOpen(true);
    };

    const handleEditClick = (item) => {
        setModalMode('edit');
        setCurrentItem(item);
        setModalOpen(true);
    };

    const handleDeleteClick = (itemId) => {
        setItemToDelete(itemId);
        onAlertOpen();
    };

    const confirmDelete = async () => {
        try {
            await deleteItem(itemToDelete);
            setItems((prevItems) => prevItems.filter((item) => item.id !== itemToDelete));
            setNextIdx((prevNextIdx) => (prevNextIdx ? prevNextIdx - 1 : prevNextIdx));
            showSuccessToast(toast, 'Item deleted.');
        } catch (error) {
            console.error(error);
            showErrorToast(
                toast,
                'An error occurred.',
                error.response ? error.response.data : error.message
            );
        } finally {
            onAlertClose();
            setItemToDelete(null);
        }
    };

    const handleModalSubmit = async (inputValue) => {
        if (inputValue.trim() === '') return;
        setModalLoading(true);
        try {
            if (modalMode === 'add') {
                const newItem = await addItem(inputValue);
                if (!nextIdx) {
                    setItems((prevItems) => [...prevItems, newItem]);
                }
                showSuccessToast(toast, 'Item added.');
            } else if (modalMode === 'edit' && currentItem) {
                const updatedItem = await updateItem(currentItem.id, inputValue);
                setItems((prevItems) =>
                    prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
                );
                showSuccessToast(toast, 'Item updated.');
            }
            setModalOpen(false);
        } catch (error) {
            console.error(error);
            showErrorToast(
                toast,
                'An error occurred.',
                error.response ? error.response.data : error.message
            );
        }
        setModalLoading(false);
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            px={4}
        >
            <Box borderWidth='1px' width="100%" maxW="800px" borderRadius='lg' m='3' p='15'>

                <Heading as="h1" size="xl" mb={4}>
                    Todo List App
                </Heading>

                <ItemList items={items} onEdit={handleEditClick} onDelete={handleDeleteClick} />
                {!items.length && nextIdx === null &&
                    <Text as='i'>All done! Time to relax… or add a new task?</Text>
                }

                <InfiniteScrollTrigger
                    onLoadMore={loadItems}
                    loading={loading}
                    hasMore={nextIdx !== null}
                />

                {loading && (
                    <Box display="flex" justifyContent="center" my={4}>
                        <Spinner size="lg" />
                    </Box>
                )}

                <Button mt={4}
                        colorScheme="teal"
                        onClick={handleAddClick}
                        leftIcon={<AddIcon />}
                        aria-label={'Add item'}
                        display={{ base: 'none', sm: 'inline-flex' }}>
                    Add Item
                </Button>
                <IconButton
                    aria-label="Add item"
                    icon={<AddIcon />}
                    size="md"
                    mt={4}
                    colorScheme="teal"
                    onClick={handleAddClick}
                    display={{ base: 'inline-flex', sm: 'none' }}
                />

                <ItemModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    mode={modalMode}
                    initialValue={modalMode === 'edit' && currentItem ? currentItem.value : ''}
                    onSubmit={handleModalSubmit}
                    isLoading={modalLoading}
                />

                <DeleteConfirmationDialog
                    isOpen={isAlertOpen}
                    onClose={onAlertClose}
                    onConfirm={confirmDelete}
                />
            </Box>
        </Box>
    );
}

export default App;