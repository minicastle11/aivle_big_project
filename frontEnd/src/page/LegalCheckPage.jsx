import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Head from '../Head';
import './LegalCheckPage.css';

function LegalCheckPage() {
    const navigate = useNavigate();
    const location = useLocation();

    // 이전 단계(ProjectCreate)에서 넘겨받은 파일명 (없을 경우 기본값)
    const fileName = location.state?.fileName || '업로드된 사업기획서';

    // AI 에이전트 연동용 상태 관리 (초기 상태, 로딩 상태, 결과 데이터)
    const [loading, setLoading] = useState(true);
    const [legalResult, setLegalResult] = useState({
        status: 'PASS', // 'PASS' | 'FAIL'
        reason: '',
    });

    // 백엔드 AI 에이전트 API 호출 모킹 (추후 실제 API 요청으로 교체)
    useEffect(() => {
        const fetchLegalAnalysis = async () => {
            setLoading(true);
            try {
                /* [추후 에이전트 연동 예시]
                const response = await fetch('/api/legal-check', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ fileName })
                });
                const data = await response.json();
                setLegalResult(data);
                */

                // 가상 백엔드 지연 (1.5초 후 응답)
                setTimeout(() => {
                    setLegalResult({
                        status: 'PASS', // 테스트 시 'FAIL'로 바꿔 확인 가능
                        reason:
                            '개인정보 보호법 및 전자상거래법 관련 규제 항목을 정상 준수하고 있습니다. 추가적인 법적 인허가 이슈는 발견되지 않았습니다.',
                    });
                    setLoading(false);
                }, 1500);
            } catch (error) {
                console.error('법률 검토 중 오류 발생:', error);
                setLegalResult({
                    status: 'FAIL',
                    reason: '법률 검토 분석 중 오류가 발생했습니다. 다시 시도해 주세요.',
                });
                setLoading(false);
            }
        };

        fetchLegalAnalysis();
    }, [fileName]);

    // 사업성 분석 화면으로 이동
    const handleGoToBusinessAnalysis = () => {
        navigate('/business-analysis', {
            state: { legalResult, fileName },
        });
    };

    return (
        <div className="legal-check-container">

            <div className="legal-check-body">
                {/* 좌측 사이드바 */}
                <aside className="virtual-market-sidebar">
                    <button
                        type="button"
                        className="virtual-market-home-button"
                        onClick={() => navigate('/')}
                        aria-label="홈으로 이동"
                    >
                        ⌂
                    </button>

                    <nav className="virtual-market-side-menu" aria-label="사용자 메뉴">
                        <button
                            type="button"
                            className="active"
                            onClick={() => navigate('/project-create')}
                        >
                            기획서 등록
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/business-analysis')}
                        >
                            사업성 분석
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/virtual-market')}
                        >
                            가상 시장 검증
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/dashboard')}
                        >
                            대시 보드
                        </button>
                    </nav>
                </aside>

                {/* 우측 메인 본문 영역 */}
                <main className="legal-check-main">
                    <div className="legal-content-wrapper">
                        {/* 타이틀 */}
                        <h1 className="legal-title">법률/규제 검토 결과</h1>

                        {/* 연한 민트색 결과 표시 박스 */}
                        <div className="legal-result-card">
                            {loading ? (
                                <div className="legal-loading-box">
                                    <div className="spinner"></div>
                                    <p>AI 법률 검토 에이전트가 기획서를 분석하고 있습니다...</p>
                                </div>
                            ) : (
                                <div className="legal-result-content">
                                    <div
                                        className={`status-badge ${
                                            legalResult.status === 'PASS' ? 'pass' : 'fail'
                                        }`}
                                    >
                                        {legalResult.status === 'PASS' ? '통과' : '불통과'}
                                    </div>

                                    <p className="reason-text">
                                        <strong>사유 : </strong>
                                        {legalResult.reason || '상세 검토 사유가 존재하지 않습니다.'}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* 하단 버튼 (사업성 분석 화면으로 이동) */}
                        <div className="legal-action-group">
                            <button
                                type="button"
                                className="action-btn business-next-btn"
                                onClick={handleGoToBusinessAnalysis}
                                disabled={loading}
                            >
                                사업성 분석 화면으로
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default LegalCheckPage;