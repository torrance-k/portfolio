<template>
    <div class="glass p-6">
        <ol class="relative border-s border-white/30 dark:border-white/10">
            <li v-for="item in items" :key="item.role" class="ms-4 py-4">
                <div
                    class="absolute w-2 h-2 rounded-full bg-white/60 dark:bg-white/30 -start-1 translate-x-[-50%] mt-3">
                </div>
                <h3 class="font-medium">{{ item.role }} · {{ item.company }}</h3>
                <p class="text-xs text-slate-600 dark:text-slate-400">{{ item.period }}</p>
                <ul class="mt-2 grid gap-1 text-sm text-slate-800 dark:text-slate-200 list-disc list-inside">
                    <li v-for="p in item.points" :key="p">{{ p }}</li>
                </ul>
            </li>
        </ol>
    </div>
</template>


<script setup lang="ts">
const items = [
    {
        role: 'Software Engineer II/Frontend Engineer',
        company: 'Renaissance Learning',
        period: '2022 - 2025',
        points: [
            'Frontend lead for major feature release involving authoring technical diagrams, JSON contracts, workload planning, aligning with backend team and accelerating delivery.',
            'Used AWS Terraform in conjunction with various other AWS technologies to build permissions and deploy ECS containerized application. '
        ]
    },
    {
        role: 'Software Development Engineer',
        company: 'Candidus, Inc.',
        period: '2021 - 2022',
        points: [
            'Modernized legacy full-stack SPA appliation',
            'Reduced customer support tickets by 50%'
        ]
    },
    {
        role: 'Junior Software Engineer',
        company: 'Mezmeriz, Inc.',
        period: '2019 - 2021',
        points: [
            'Implemented neural network training set via C# for LiDAR scan evaluation',
            'Used Angluar and Socket.IO to build real-time notification service integrated from frontend to backend'
        ]
    }
]
</script>