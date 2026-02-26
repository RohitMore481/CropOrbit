import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [state, setState] = useState({
        user: null,
        selectedFields: [],
        stressResults: {
            summary: null,
            fields: {}
        },
        reports: [],
        analysisType: 'Combined',
        isOverlayVisible: true,
        loadingState: false,
        isReportsOpen: false
    });

    const setUser = (user) => setState(prev => ({ ...prev, user: typeof user === 'function' ? user(prev.user) : user }));
    const setSelectedFields = (fields) => setState(prev => ({ ...prev, selectedFields: typeof fields === 'function' ? fields(prev.selectedFields) : fields }));
    const setStressResults = (results) => setState(prev => ({ ...prev, stressResults: typeof results === 'function' ? results(prev.stressResults) : results }));
    const setLoadingState = (isLoading) => setState(prev => ({ ...prev, loadingState: typeof isLoading === 'function' ? isLoading(prev.loadingState) : isLoading }));
    const setReports = (reports) => setState(prev => ({ ...prev, reports: typeof reports === 'function' ? reports(prev.reports) : reports }));
    const setAnalysisType = (analysisType) => setState(prev => ({ ...prev, analysisType: typeof analysisType === 'function' ? analysisType(prev.analysisType) : analysisType }));
    const setIsOverlayVisible = (isOverlayVisible) => setState(prev => ({ ...prev, isOverlayVisible: typeof isOverlayVisible === 'function' ? isOverlayVisible(prev.isOverlayVisible) : isOverlayVisible }));
    const setIsReportsOpen = (isOpen) => setState(prev => ({ ...prev, isReportsOpen: typeof isOpen === 'function' ? isOpen(prev.isReportsOpen) : isOpen }));

    return (
        <AppContext.Provider value={{
            ...state,
            setUser,
            setSelectedFields,
            setStressResults,
            setLoadingState,
            setReports,
            setAnalysisType,
            setIsOverlayVisible,
            setIsReportsOpen
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
