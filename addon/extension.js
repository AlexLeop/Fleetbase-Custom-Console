export default {
    setupExtension(app, universe) {
        const menuService = universe.getService('universe/menu-service');

        // Registra "Financeiro" no header de navegação do console
        menuService.registerHeaderMenuItem('Financeiro', 'console.financeiro', {
            icon: 'money-bill-wave',
            priority: 5,
            description: 'Gestão financeira de motoboys: escalas, lançamentos e cálculos.',
            shortcuts: [
                {
                    title: 'Escalas',
                    description: 'Gerenciar escalas de trabalho dos motoboys.',
                    icon: 'calendar-days',
                    route: 'console.financeiro.escalas',
                },
                {
                    title: 'Lançamentos',
                    description: 'Registrar combustível, manutenção, adiantamentos e outros.',
                    icon: 'file-lines',
                    route: 'console.financeiro.lancamentos',
                },
                {
                    title: 'Cálculo Semanal',
                    description: 'Calcular relatório financeiro semanal por motoboy.',
                    icon: 'calculator',
                    route: 'console.financeiro.calculo',
                },
                {
                    title: 'Créditos',
                    description: 'Gerenciar créditos dos motoboys.',
                    icon: 'credit-card',
                    route: 'console.financeiro.creditos',
                },
                {
                    title: 'Taxas',
                    description: 'Configurar taxas e valores de referência.',
                    icon: 'sliders',
                    route: 'console.financeiro.taxas',
                },
            ],
        });
    },
};
