import { useState, useEffect } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    FormControl,
    FormLabel,
    Button,
} from '@chakra-ui/react';

const ItemModal = ({
   isOpen,
   onClose,
   mode,
   initialValue,
   onSubmit,
   isLoading,
}) => {
    const [inputValue, setInputValue] = useState(initialValue || '');

    useEffect(() => {
        if (isOpen) {
            setInputValue(initialValue || '');
        }
    }, [isOpen, initialValue]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() === '') return;
        onSubmit(inputValue);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered
            closeOnOverlayClick={!isLoading}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{mode === 'add' ? 'Add Item' : 'Edit Item'}</ModalHeader>
                <ModalCloseButton disabled={isLoading} aria-label={'Close dialog'}/>
                <form onSubmit={handleSubmit}>
                    <ModalBody>
                        <FormControl isRequired>
                            <FormLabel>Item Value</FormLabel>
                            <Input
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                disabled={isLoading}
                                autoFocus
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button mr={3} colorScheme="gray" onClick={onClose} disabled={isLoading} aria-label={'Cancel'}>
                            Cancel
                        </Button>
                        <Button
                            colorScheme="blue"

                            type="submit"
                            isLoading={isLoading}
                            disabled={isLoading || inputValue.trim() === ''}
                            aria-label={`${mode === 'add' ? 'Add' : 'Update'} item`}
                        >
                            {mode === 'add' ? 'Add' : 'Update'}
                        </Button>

                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default ItemModal;