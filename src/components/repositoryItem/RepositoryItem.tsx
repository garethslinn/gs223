import React, { useState, useEffect } from 'react';
import { ItemWrapper, ImageSection, ContentSection, ButtonSection } from './RepositoryItem.styles';
import { RepositoryItemProps } from './RepositoryItem.type';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { CONSTANT } from '../../constants';

const { SELECTED_STATES_KEY } = CONSTANT

const RepositoryItem: React.FC<RepositoryItemProps> = ({ repo }) => {
    // I'm using localstorage to maintain persistent flag status tracking
    // Ideally this needs to be in one place i.e. repository-selected-states
    const [isSelected, setIsSelected] = useState(() => {
        const selectedStates = JSON.parse(localStorage.getItem(SELECTED_STATES_KEY) || '{}');
        return selectedStates[repo.id] ?? false;
    });

    useEffect(() => {
        const selectedStates = JSON.parse(localStorage.getItem(SELECTED_STATES_KEY) || '{}');
        selectedStates[repo.id] = isSelected;
        localStorage.setItem(SELECTED_STATES_KEY, JSON.stringify(selectedStates));
    }, [isSelected, repo.id]);

    return (
        <ItemWrapper>
            <ImageSection>
                <a href={repo.owner.html_url} target="_blank" rel="noopener noreferrer">
                    <img src={repo.owner.avatar_url} alt="avatar" />
                </a>
            </ImageSection>
            <ContentSection>
                <h3>{repo.full_name}</h3>
                <p>{repo.description}</p>
            </ContentSection>
            <ButtonSection>
                <button onClick={() => setIsSelected(!isSelected)}>
                    {!isSelected ? (
                        <FontAwesomeIcon icon={faTimesCircle} data-testid="cross-icon" color="red" />
                    ) : (
                        <FontAwesomeIcon icon={faCheckCircle} data-testid="check-icon" color="green" />
                    )}
                </button>
            </ButtonSection>
        </ItemWrapper>
    );
};

export default RepositoryItem;
