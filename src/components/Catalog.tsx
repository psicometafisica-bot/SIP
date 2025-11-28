import React from 'react';
import type { Material, ComplianceStatus, RiskLevel } from '../types';

interface CatalogProps {
    inventory: Material[];
    onApproveMaterial: (sku: string) => void;
}

const ComplianceBadge: React.FC<{ status: ComplianceStatus }> = ({ status }) => {
    const colorClasses = {
        'Validado': 'bg-green-100 text-green-800',
        'En Revisión': 'bg-yellow-100 text-yellow-800',
        'No Conforme': 'bg-red-100 text-red-800',
    };
    return <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClasses[status]}`}>{status}</span>;
};

const RiskBadge: React.FC<{ level: RiskLevel }> = ({ level }) => {
    const colorClasses = {
        'Bajo': 'text-gray-600',
        'Medio': 'text-yellow-600',
        'Alto': 'text-red-600',
    };
     const icon = {
        'Bajo': '●',
        'Medio': '▲',
        'Alto': '■',
    }
    return <span className={`font-bold ${colorClasses[level]}`}>{icon[level]} {level}</span>;
};


const Catalog: React.FC<CatalogProps> = ({ inventory, onApproveMaterial }) => {

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-tec-gray mb-1">Catálogo de Materiales (Simulación Sphera)</h2>
            <p className="text-sm text-gray-500 mb-4">Gestión de datos maestros, cumplimiento y riesgo de materiales.</p>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado Cumplimiento</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nivel de Riesgo</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acción</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {inventory.map((material) => (
                            <tr key={material.sku} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{material.sku}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 max-w-xs truncate">{material.description}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <ComplianceBadge status={material.complianceStatus} />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <RiskBadge level={material.riskLevel} />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    {material.complianceStatus === 'En Revisión' ? (
                                        <button 
                                            onClick={() => onApproveMaterial(material.sku)}
                                            className="bg-tec-green text-white text-xs font-bold py-1 px-2 rounded hover:bg-opacity-80 transition-colors"
                                        >
                                            Aprobar
                                        </button>
                                    ) : (
                                        <span className="text-gray-400 text-xs">--</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
             <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                <div className="flex items-center"><span className="h-4 w-4 bg-green-100 border border-green-300 rounded-sm mr-2"></span> Validado</div>
                <div className="flex items-center"><span className="h-4 w-4 bg-yellow-100 border border-yellow-300 rounded-sm mr-2"></span> En Revisión</div>
                <div className="flex items-center"><span className="h-4 w-4 bg-red-100 border border-red-300 rounded-sm mr-2"></span> No Conforme</div>
            </div>
        </div>
    );
};

export default Catalog;